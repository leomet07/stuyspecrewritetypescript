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

const SearchRoute = (props: Props) => {
  const [sortingOption, setSortingOption] = useState("relevance");
  const [sortedArticles, setSortedArticles] = useState<ReceivedArticle[]>(props.articles);

  useEffect(() => {
    sortArticles();
  }, [sortingOption]);

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortingOption(event.target.value);
  };

  const sortArticles = () => {
    const articlesCopy = [...props.articles];

    if (sortingOption === "newest") {
      articlesCopy.sort((a, b) => {
        if (a.volume === b.volume) {
          return b.issue - a.issue;
        }
        return b.volume - a.volume;
      });
    } else if (sortingOption === "oldest") {
      articlesCopy.sort((a, b) => {
        if (a.volume === b.volume) {
          return a.issue - b.issue;
        }
        return a.volume - b.volume;
      });
    }

    setSortedArticles(articlesCopy);
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
            <option value="relevance">Relevance</option>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
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
};

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
