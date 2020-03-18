import React from 'react'
import { Link } from 'gatsby'
import { RepositoryType } from '../pages/index'

// use require to avoid typescript complaints
const styles = require('./grid.module.css')
const defaultBanner = require('../images/default-banner.svg')

type CardProps = {
  repo: RepositoryType
}

const Card = ({ repo }: CardProps) => (
  <Link to={repo.name} className={styles.cardWrap}>
    <div
      className={styles.banner}
      style={{
        backgroundImage: `url(${repo.usesCustomOpenGraphImage
          ? repo.openGraphImageUrl
          : defaultBanner
        })`
      }}
    />
    <div className={styles.cardContent}>
      <strong>{repo.name}</strong>
      <br/>
      {repo.description}
    </div>
    {!!repo.repositoryTopics.nodes.length && (
      <footer className={styles.cardFooter}>
        {repo.repositoryTopics.nodes.map(node => (
          <div className={styles.label} key={node.id}>{node.topic.name}</div>
        ))}
      </footer>
    )}
  </Link>
)

type GridProps = {
  repositories: RepositoryType[]
}

const Grid = ({ repositories }: GridProps) => (
  <div className={styles.grid}>
    {repositories.map(repo => (
      <Card key={repo.id} repo={repo} />
    ))}
  </div>
)

export default Grid