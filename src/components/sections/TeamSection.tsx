import type { FC, CSSProperties } from 'react';
import SectionTitle from '../ui/SectionTitle';
import type { TeamMember } from '../../types';
import styles from './TeamSection.module.css';

/* ---- Social icons ---- */
const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 22.43.36a9 9 0 0 1-2.88 1.1A4.52 4.52 0 0 0 11.53 8a12.81 12.81 0 0 1-9.3-4.71 4.52 4.52 0 0 0 1.4 6.03A4.47 4.47 0 0 1 1.64 9v.06a4.52 4.52 0 0 0 3.62 4.43 4.54 4.54 0 0 1-2.04.08 4.53 4.53 0 0 0 4.22 3.13A9.07 9.07 0 0 1 1 19.54a12.8 12.8 0 0 0 6.92 2.03c8.3 0 12.85-6.88 12.85-12.85 0-.2 0-.39-.01-.58A9.17 9.17 0 0 0 23 3z" />
  </svg>
);

const EmailIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

/* ---- TeamMemberCard ---- */
interface TeamMemberCardProps {
  member: TeamMember;
  style?: CSSProperties;
}

const TeamMemberCard: FC<TeamMemberCardProps> = ({ member, style }) => (
  <article className={styles['team-member-card']} style={style}>
    <div className={styles['team-member-card__photo-wrap']}>
      <img
        src={member.photoUrl}
        alt={member.name}
        className={styles['team-member-card__photo']}
        loading="lazy"
        decoding="async"
      />
      {/* Social overlay */}
      {member.socialLinks && (
        <div
          className={styles['team-member-card__overlay']}
        >
          <ul className={styles['team-member-card__social-links']}>
            {member.socialLinks.linkedin && (
              <li>
                <a
                  href={member.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles['team-member-card__social-link']}
                  aria-label={`${member.name} on LinkedIn`}
                >
                  <LinkedInIcon />
                </a>
              </li>
            )}
            {member.socialLinks.twitter && (
              <li>
                <a
                  href={member.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles['team-member-card__social-link']}
                  aria-label={`${member.name} on Twitter`}
                >
                  <TwitterIcon />
                </a>
              </li>
            )}
            {member.socialLinks.email && (
              <li>
                <a
                  href={`mailto:${member.socialLinks.email}`}
                  className={styles['team-member-card__social-link']}
                  aria-label={`Email ${member.name}`}
                >
                  <EmailIcon />
                </a>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>

    <h3 className={styles['team-member-card__name']}>{member.name}</h3>
    <p className={styles['team-member-card__role']}>{member.role}</p>
    {member.bio && (
      <p className={styles['team-member-card__bio']}>{member.bio}</p>
    )}
  </article>
);

/* ---- TeamSection ---- */
interface TeamSectionProps {
  members: TeamMember[];
}

const TeamSection: FC<TeamSectionProps> = ({ members }) => (
  <section id="team" className={styles['team-section']}>
    <div className={styles['team-section__inner']}>
      <SectionTitle
        eyebrow="Our Specialists"
        heading="Meet the Team"
        sub="Board-certified professionals dedicated to delivering exceptional care with every visit."
        align="center"
      />
      <div className={styles['team-section__grid']}>
        {members.map((member, i) => (
          <TeamMemberCard
            key={member.id}
            member={member}
            style={{ animationDelay: `${i * 100}ms` }}
          />
        ))}
      </div>
    </div>
  </section>
);

export default TeamSection;
