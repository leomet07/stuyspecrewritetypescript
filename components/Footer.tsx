/* eslint-disable @next/next/no-img-element */
import styles from "../styles/Footer.module.css";
import Link from "next/link";
import LatestPreviewImage from "./LatestPreviewImage";

import {
	BsSpotify,
	BsFacebook,
	BsInstagram,
	BsLinkedin,
	BsGithub,
} from "react-icons/bs";

const Footer = () => {
	const year = new Date().getFullYear();

	return (
		<>
			<footer id={styles.footer}>
				<div id={styles.socialsBar}>
					<p id={styles.logo}>
						<Link href="/">The Spectator</Link>
					</p>
					<div id={styles.mediaButtons}>
						<Link
							href="https://open.spotify.com/show/40JaCJA0FvtZToAv81qVjz"
							aria-label="The Lens Podcast on Spotify"
						>
							<BsSpotify id={styles.mediaButton} />
						</Link>
						<Link
							href="https://www.facebook.com/stuyspectator"
							aria-label="Facebook"
						>
							<BsFacebook id={styles.mediaButton} />
						</Link>
						<Link
							href="https://www.instagram.com/stuyspectator/"
							aria-label="Instagram"
						>
							<BsInstagram id={styles.mediaButton} />
						</Link>
						<Link
							href="https://www.linkedin.com/company/the-stuyvesant-spectator"
							aria-label="Linkedin"
						>
							<BsLinkedin id={styles.mediaButton} />
						</Link>
						<Link
							href="https://github.com/stuyspec"
							aria-label="GitHub"
						>
							<BsGithub id={styles.mediaButton} />
						</Link>
					</div>
				</div>
				<div id={styles.separator}></div>
				<div id={styles.grid}>
					<div id={styles.column}>
						<div id={styles.cell}>
							<h3 id={styles.department}>
								<Link href="/department/news">News</Link>
							</h3>
							<p id={styles.subdepartment}>
								<Link href="/department/news/campaign-coverage">
									Campaign Coverage
								</Link>
							</p>
							<p id={styles.subdepartment}>
								<Link href="/department/news/1031-terror-attack">
									10/31 Terror Attack
								</Link>
							</p>
							<p id={styles.subdepartment}>
								<Link href="/department/news/black-lives-matter">
									Black Lives Matter
								</Link>
							</p>
							<p id={styles.subdepartment}>
								<Link href="/topic/israel-palestine">
									Israel-Hamas War
								</Link>
							</p>
						</div>
						<div id={styles.cell}>
							<h3 id={styles.department}>
								<Link href="/department/features">
									Features
								</Link>
							</h3>
							<p id={styles.subdepartment}>
								<Link href="/department/features/voices">
									VOICES
								</Link>
							</p>
							<p id={styles.subdepartment}>
								<Link href="/department/features/9-11">
									9/11
								</Link>
							</p>
						</div>
						<div id={styles.cell}>
							<h3 id={styles.department}>
								<Link href="/department/opinions">
									Opinions
								</Link>
							</h3>
							<p id={styles.subdepartment}>
								<Link href="/department/opinions/blacklivesmatter">
									#BlackLivesMatter
								</Link>
							</p>
							<p id={styles.subdepartment}>
								<Link href="/department/opinions/staff-editorials">
									Staff Editorials
								</Link>
							</p>
							<p id={styles.subdepartment}>
								<Link href="/department/opinions/writing-competition">
									Writing Competition
								</Link>
							</p>
						</div>
					</div>
					<div id={styles.column}>
						<div id={styles.cell}>
							<h3 id={styles.department}>
								<Link href="/department/science">Science</Link>
							</h3>
							<p id={styles.subdepartment}>
								<Link href="/department/science/at-stuy">
									Science at Stuy
								</Link>
							</p>
							<p id={styles.subdepartment}>
								<Link href="/department/science/coronavirus-pandemic">
									Coronavirus Pandemic
								</Link>
							</p>
						</div>
						<div id={styles.cell}>
							<h3 id={styles.department}>
								<Link href="/department/humor">Humor</Link>
							</h3>
							<p id={styles.subdepartment}>
								<Link href="/department/humor/disrespectator">
									Disrespectator
								</Link>
							</p>
							<p id={styles.subdepartment}>
								<Link href="/department/humor/spooktator">
									Spooktator
								</Link>
							</p>
						</div>
						<div id={styles.cell}>
							<h3 id={styles.department}>
								<Link href="/department/sports">Sports</Link>
							</h3>
							<p id={styles.subdepartment}>
								<Link href="/department/sports/professional-sports">
									Professional Sports
								</Link>
							</p>
							<p id={styles.subdepartment}>
								<Link href="/department/sports/sports-at-stuyvesant">
									Sports At Stuy
								</Link>
							</p>
						</div>
					</div>
					<div id={styles.column}>
						<div id={styles.cell}>
							<h3 id={styles.department}>
								<Link href="/department/ae">
									Arts and Entertainment
								</Link>
							</h3>
							<p id={styles.subdepartment}>
								<Link href="/department/ae/fashion">
									Fashion
								</Link>
							</p>
							<p id={styles.subdepartment}>
								<Link href="/department/ae/art">Art</Link>
							</p>
							<p id={styles.subdepartment}>
								<Link href="/department/ae/culture">
									Culture
								</Link>
							</p>
							<p id={styles.subdepartment}>
								<Link href="/department/ae/film">Film</Link>
							</p>
							<p id={styles.subdepartment}>
								<Link href="/department/ae/food">Food</Link>
							</p>
							<p id={styles.subdepartment}>
								<Link href="/department/ae/literature">
									Literature
								</Link>
							</p>
							<p id={styles.subdepartment}>
								<Link href="/department/ae/music">Music</Link>
							</p>
							<p id={styles.subdepartment}>
								<Link href="/department/ae/television">
									Television
								</Link>
							</p>
							<p id={styles.subdepartment}>
								<Link href="/department/ae/theater">
									Theater
								</Link>
							</p>
							<p id={styles.subdepartment}>
								<Link href="/department/ae/thinkpiece">
									Thinkpiece
								</Link>
							</p>
							<p id={styles.subdepartment}>
								<Link href="/department/ae/sing!">SING!</Link>
							</p>
							<p id={styles.subdepartment}>
								<Link href="/department/ae/stc">STC</Link>
							</p>
						</div>
					</div>
					<div id={styles.column}>
						{/* Will be used when photo essays added
						<div id={styles.cell}>
							<h3 id={styles.department}>
								<Link href="/department/media">Media</Link>
							</h3>
						</div> */}
						<div id={styles.cell}>
							<h3 id={styles.department}>
								<Link href="/department/spec-plus">Spec+</Link>
							</h3>
							<p id={styles.subdepartment}>
								<Link href="/department/spec-plus/college-issue">
									College Issue
								</Link>
							</p>
							<p id={styles.subdepartment}>
								<Link href="/department/spec-plus/quaranzine">
									Quaranzine
								</Link>
							</p>
							<p id={styles.subdepartment}>
								<Link href="/department/spec-plus/undercurrents">
									Undercurrents
								</Link>
							</p>
						</div>
						<div id={styles.cell}>
							<h3 id={styles.department}>
								<Link href="/about">About Us</Link>
							</h3>
							<p id={styles.subdepartment}>
								<Link href="/about/our-charter">
									Our Charter
								</Link>
							</p>
							<p id={styles.subdepartment}>
								<Link href="/about/advertise">Advertise</Link>
							</p>
							<p id={styles.subdepartment}>
								<Link href="/about/sponsors">Sponsors</Link>
							</p>
							<p id={styles.subdepartment}>
								<Link href="/about/staff">Staff</Link>
							</p>
							<p id={styles.subdepartment}>
								<Link href="/about/developers">Developers</Link>
							</p>
							<p id={styles.subdepartment}>
								<Link href="/about/contact">Contact</Link>
							</p>
						</div>
						<div id={styles.cell}>
							<h3
								id={styles.department}
								className={styles.virtualArchives}
							>
								<Link passHref href="https://pdf.stuyspec.com">
									Virtual Archives
								</Link>
							</h3>
						</div>
					</div>
					<div id={styles.column}>
						<LatestPreviewImage
							imageClass={styles.archiveImage1}
							imageIndex={0}
						/>
					</div>
					<div id={styles.column}>
						<LatestPreviewImage
							imageClass={styles.archiveImage2}
							imageIndex={1}
						/>
					</div>
				</div>
				<div id={styles.declarations}>
					<p id={styles.left}>
						© {year} Stuyvesant Spectator Web Department. All
						rights reserved.
					</p>
					<p id={styles.right} className="link">
						<Link
							passHref
							href="https://github.com/stuyspec/stuyspec-rewrite/issues"
							target="_blank"
							rel="noopener"
						>
							Found a bug? Report it here.
						</Link>
					</p>
				</div>
			</footer>
		</>
	);
};

export default Footer;
