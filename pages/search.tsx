import Head from "next/head";
import { ReceivedArticle, ReceivedStaff } from "../ts_types/db_types";
import { NextPageContext } from "next";
import styles from "../styles/SearchRoute.module.css";
import { get_articles_by_string_query, get_staffs_by_query } from "../db";
import ListArticleDisplay from "../components/ListArticleDisplay";
import Link from "next/link";
import { useState, useEffect } from "react";

interface Props {
  articles: ReceivedArticle[];
  query: string;
  staff: ReceivedStaff[];
}

enum sortingOptions {
  Newest = "newest",
  Relevance = "relevance",
  Oldest = "oldest",
}

function SearchRoute(props: Props) {
  const [sortingOption, setSortingOption] = useState<sortingOptions>(sortingOptions.Relevance);
  const [sortedArticles, setSortedArticles] = useState<ReceivedArticle[]>(props.articles);
  const [filterIssue, setFilterIssue] = useState<number | null>(null);

  const [filterVolume, setFilterVolume] = useState<number | null>(null);

  useEffect(() => {
    sortArticles();
  }, [sortingOption]);

  useEffect(() => {
    sortArticles();
  }, [filterIssue]);

  useEffect(() => {
    sortArticles();
  }, [filterVolume]);

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortingOption(event.target.value as sortingOptions);
  };

  const handleIssueChange = (event: { target: { value: string } }) => {
    let selectedIssue = parseInt(event.target.value, 10);
    setFilterIssue(selectedIssue !== -1 ? selectedIssue : null);
  };

  const handleVolumeChange = (event: { target: { value: string } }) => {
    let selectedVolume = parseInt(event.target.value, 10);
    setFilterVolume(selectedVolume !== -1 ? selectedVolume : null);
  };

  const sortArticles = () => {
    const articlesCopy = [...props.articles];
    if (Number.isNaN(filterIssue) || filterIssue == null) {
      if (Number.isNaN(filterVolume) || filterVolume == null) {
        setSortedArticles(articlesCopy);
      } else {
        const filteredArticles = articlesCopy.filter(
          (article) => article.volume === filterVolume
        );
        setSortedArticles(filteredArticles);
      }
    } else if (!(Number.isNaN(filterIssue) || filterIssue == null)) {
      if (!(Number.isNaN(filterVolume) || filterVolume == null)) {
        const filteredArticles = articlesCopy.filter(
          (article) => article.volume === filterVolume
        );
        const filteredArticles2 = filteredArticles.filter(
          (article) => article.issue === filterIssue
        );
        setSortedArticles(filteredArticles2);
      } else {
        const filteredArticles = articlesCopy.filter(
          (article) => article.issue === filterIssue
        );
        setSortedArticles(filteredArticles);
      }
    }

    if (sortingOption === sortingOptions.Newest) {
      articlesCopy.sort((a, b) => {
        if (a.volume === b.volume) {
          return b.issue - a.issue;
        }
        return b.volume - a.volume;
      });
    } else if (sortingOption === sortingOptions.Oldest) {
      articlesCopy.sort((a, b) => {
        if (a.volume === b.volume) {
          return a.issue - b.issue;
        }
        return a.volume - b.volume;
      });
    }
  };

  return (
    <div>
      <main id={styles.main}>
        <h1 id={styles.heading}>
          Showing {props.articles.length + props.staff.length} results for:{" "}
          {"'"}
          {props.query}
          {"'"}
        </h1>
        <div>
          <label htmlFor="sort-select">Sort by:</label>
          <select id="sort-select" value={sortingOption} onChange={handleSortChange}>
            <option value={sortingOptions.Relevance}>Relevance</option>
            <option value={sortingOptions.Newest}>Newest</option>
            <option value={sortingOptions.Oldest}>Oldest</option>
          </select>
        </div>
        <div>
          <label htmlFor="filter-issue-select">Filter by Issue: </label>
          <input id="filter-issue-select" placeholder="Issue number" onChange={handleIssueChange}>
          </input>
        </div>
        <div>
          <label htmlFor="filter-issue-select">Filter by Volume: </label>
          <input id="filter-volume-select" placeholder="Volume number" onChange={handleVolumeChange}>
          </input>
        </div>

        {props.staff.length > 0 && (
          <>
            <h2>{props.staff.length} staff members found:</h2>
            <section id={styles.returned_staff}>
              {props.staff.map((staff_member, index) => (
                <div key={index}>
                  <h1 id={styles.name}>
                    <Link href={"/staff/" + encodeURIComponent(staff_member.slug)}>
                      {staff_member.name}{" "}
                      <span id={styles.slug}>({staff_member.slug})</span>
                    </Link>
                  </h1>
                  <a href={"mailto:" + staff_member.email} id={styles.email}>
                    {staff_member.email}
                  </a>
                </div>
              ))}
            </section>
          </>
        )}
        <h2 id={styles.articles_found_label}>
          {sortedArticles.length} articles found:
        </h2>
        <ListArticleDisplay articles={sortedArticles} />
      </main>
    </div>
  );
}

export default SearchRoute;

export async function getServerSideProps(context: NextPageContext) {
  let query = String(context.query.query);

  const articles = JSON.parse(
    JSON.stringify(await get_articles_by_string_query(query, 20))
  ) as ReceivedArticle[];

  const staff = JSON.parse(
    JSON.stringify(
      await get_staffs_by_query({
        $text: { $search: query },
      })
    )
  );

  if (articles) {
    return {
      props: {
        articles: articles,
        query: query,
        staff: staff,
      },
    };
  } else {
    return {
      notFound: true,
      props: { attempted_identifier: query },
    };
  }
}
