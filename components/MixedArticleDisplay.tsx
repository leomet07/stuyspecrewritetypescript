import {
	DepartmentsArray,
	DepartmentsArrayDisplay,
	ReceivedArticle,
} from "../ts_types/db_types";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/MixedArticleDisplay.module.css";
import groupByImageExists from "../utils/groupArticles";
import generate_contributors_jsx from "./GenerateContributorsJSX";
import { useCallback, useEffect, useState, Fragment } from "react";
import MixedAdvertisment from "../advertisements/MixedAdvertisement";
import { format } from "date-fns";

function CenterArticle(props: {
	article: ReceivedArticle;
	display_image?: boolean;
	display_department?: boolean;
}) {
	const article = props.article;
	return (
		<div className={styles.article} key={String(article._id)}>
			{props.display_image && article.cover_image ? (
				<Link passHref href={"/article/" + article.slug}>
					<div className={styles.centerImageContainer}>
						<Image
							alt="big image"
							className={styles.centerImage}
							src={article.cover_image}
							sizes="800px"
							quality={90}
							fill
						/>
					</div>
				</Link>
			) : (
				<></>
			)}
			{props.display_department ? (
				<Link
					href={`/department/${DepartmentsArray[article.section_id]}`}
					passHref
				>
					<p
						id={styles.articleInfo}
						className={styles.department + " discrete-link"}
						style={{
							fontFamily: "var(--secondary-font)",
						}}
					>
						{DepartmentsArrayDisplay[article.section_id]}
					</p>
				</Link>
			) : (
				<></>
			)}
			<Link passHref href={"/article/" + article.slug}>
				<h2 id={styles.title} className="discrete-link" dangerouslySetInnerHTML={{ __html: article.title }}>
				</h2>
			</Link>
			<p
				className={styles.authors}
				style={{
					fontFamily: "var(--secondary-font)",
				}}
			>
				By&nbsp;
				{generate_contributors_jsx(article.contributors)}
			</p>
			<Link passHref href={"/article/" + article.slug}>
				<p id={styles.summary} className="discrete-link">
					{article.summary}
				</p>
			</Link>

				<p className={styles.publication_date}>
					Published on {article.publicationDate ? format(new Date(article.publicationDate), 'MMMM dd, yyyy') : 'Date not available'}
				</p>
			<p className={styles.article_volume_issue}>
				<Link href={`/volume/${article.volume}/issue/${article.issue}`}>
					Issue {article.issue}, Volume {article.volume}
				</Link>
			</p>
		</div>
	);
}

export default function MixedArticleDisplay(props: {
	articles: ReceivedArticle[];
	display_department?: boolean;
	additional_article_function?: any;
}) {
	const returnProcessedArticles = useCallback(
		(articles_input: ReceivedArticle[]) => {
			let image_articles = Math.floor(articles_input.length / 3.5);
			const grouping = groupByImageExists(articles_input);
			const articlesWithPhotos = grouping["withPhotos"]
				.slice(0)
				.slice(0, image_articles)
				.sort((a, b) => (b.rank || 0) - (a.rank || 0))
				.sort((a, b) => b.issue - a.issue)
				.sort((a, b) => b.volume - a.volume);

			const articlesWithoutPhotos = grouping.withoutPhotos.concat(
				grouping.withPhotos.slice(0).slice(image_articles)
			);

			let process_sorted_articles = articles_input
				.slice(0)
				.sort((a, b) => b.volume - a.volume)
				.sort((a, b) => b.issue - a.issue);
			process_sorted_articles.splice(
				process_sorted_articles.findIndex(
					(v) => v._id == grouping["withPhotos"][0]._id
				),
				1
			);

			process_sorted_articles = [
				grouping["withPhotos"][0],
				...process_sorted_articles,
			];

			return {
				articlesWithPhotos,
				articlesWithoutPhotos,
				sortedArticles: process_sorted_articles,
			};
		},
		[]
	);

	const [articlesProcessed, setArticlesProcessed] = useState(
		returnProcessedArticles(props.articles)
	);

	useEffect(() => {
		setArticlesProcessed(returnProcessedArticles(props.articles));
	}, [props.articles, returnProcessedArticles]);

	const num_articles_each_side = Math.floor(
		articlesProcessed.articlesWithoutPhotos.length / 2
	);

	const handle_load_more = async () => {
		if (props.additional_article_function) {
			const articles = (await props.additional_article_function(
				articlesProcessed.sortedArticles.length,
				articlesProcessed.sortedArticles.length
			)) as ReceivedArticle[];

			const sorted_articles = articlesProcessed.sortedArticles.concat(
				articles
					.sort((a, b) => b.volume - a.volume)
					.sort((a, b) => b.issue - a.issue)
			);
			const image_articles = Math.floor(articles.length / 3);
			const grouping = groupByImageExists(articles);
			const articles_with_photos =
				articlesProcessed.articlesWithPhotos.concat(
					grouping.withPhotos.slice(0).slice(0, image_articles)
				);

			const articles_without_photos =
				articlesProcessed.articlesWithoutPhotos.concat(
					grouping.withoutPhotos.concat(
						grouping.withPhotos.slice(0).slice(image_articles)
					)
				);

			setArticlesProcessed({
				articlesWithPhotos: articles_with_photos,
				articlesWithoutPhotos: articles_without_photos,
				sortedArticles: sorted_articles,
			});
		}
	};

	const ad_spacing = 6;

	return (
		<div id={styles.mixed_article_view_container}>
			<div id={styles.mixed_article_view}>
				<section id={styles.left}>
					{articlesProcessed.articlesWithoutPhotos
						.slice(0)
						.slice(0, num_articles_each_side + 1)
						.map((article, index) => (
							<Fragment key={index}>
								<CenterArticle
									article={article}
									display_department={
										props.display_department
									}
								/>
								{index % ad_spacing == 0 ? (
									<div className={styles.ad_parent}>
										<MixedAdvertisment
											index={index / ad_spacing}
										/>
									</div>
								) : (
									<></>
								)}
							</Fragment>
						))}
				</section>
				<section id={styles.center_desktop}>
					<div className={styles.top}>
						{articlesProcessed.articlesWithPhotos
							.slice(0)
							.slice(0, 1)
							.map((article_iterator, index) => (
								<CenterArticle
									key={index}
									article={article_iterator}
									display_image
									display_department={
										props.display_department
									}
								/>
							))}
					</div>
					<div className={styles.bottom}>
						{articlesProcessed.articlesWithPhotos
							.slice(0)
							.slice(1)
							.map((article_iterator, index) => (
								<CenterArticle
									key={index}
									article={article_iterator}
									display_image
									display_department={
										props.display_department
									}
								/>
							))}
					</div>
				</section>
				<section id={styles.right}>
					{articlesProcessed.articlesWithoutPhotos
						.slice(0)
						.slice(num_articles_each_side + 1)
						.map((article, index) => (
							<Fragment key={index}>
								<CenterArticle
									article={article}
									display_department={
										props.display_department
									}
								/>
								{index % ad_spacing == 1 ? (
									<div className={styles.ad_parent}>
										<MixedAdvertisment
											index={
												Math.floor(index / ad_spacing) +
												2
											}
										/>
									</div>
								) : (
									<></>
								)}
							</Fragment>
						))}
				</section>
				<section id={styles.top_mobile}>
					{articlesProcessed.sortedArticles
						.slice(0)
						.map((article, index) => (
							<Fragment key={index}>
								<CenterArticle
									article={article}
									display_image
									display_department={
										props.display_department
									}
								/>
								{index % ad_spacing == 1 && index != 0 ? (
									<div className={styles.ad_parent}>
										<MixedAdvertisment
											index={Math.floor(
												index / ad_spacing
											)}
										/>
									</div>
								) : (
									<></>
								)}
							</Fragment>
						))}
				</section>
			</div>
			{props.additional_article_function ? (
				<>
					<button
						onClick={handle_load_more}
						id={styles.load_more_button}
					>
						Load more
					</button>
				</>
			) : (
				<></>
			)}
		</div>
	);
}
