import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types'
import css from './AuthorBox.scss';

const OneAuthorOfMany = props=>{
  return               <span className={css.authorName}>
  {i==0 && 'By '}
  <a href={'/author/'+author.aut_base_filelocation}>
    {author.aut_name}
  </a>{i<this.props.authors.length-2 && ', '}
  {i==this.props.authors.length-2 && ' and '}
</span>
}

const OnlyOneAuthor = props =>{
  return <div key={i} className="inner">
  {author.authorimage &&
    <a href={author.aut_base_filelocation}><img src={author.authorimage} className={css.authorPhoto} /></a>
  }

  <a href={author.aut_base_filelocation}><span className={css.authorName}>By {author.aut_name}</span></a>
  <span className={css.authorTitle} dangerouslySetInnerHTML={{__html: author.aut_title}}></span>

  {author.aut_twitter_id &&
    <span className={css.authorTwitter}>
      <FontAwesomeIcon icon={['fab', 'twitter']} className={css.twitterIcon} />
      <a target="_blank" rel='noreferrer noopener' href={'https://www.twitter.com/' + author.aut_twitter_id}>
        @{author.aut_twitter_id}
      </a>
    </span>
  }
</div>
}

const AuthorBoxFrame =props=>{
  const authors = this.props.authors;
  <div className={[css.authorBox,(this.props.headerType=='lead' && !this.props.isOpen)?css.authorBoxPano:''].join(' ')}>
    {authors.length == 1?<OnlyOneAuthor />:authors.map((author,i) => <OneAuthorOfMany key={i}/>)}
  </div>
}




AuthorBox.propTypes = {
  authors: PropTypes.array,
  headerType: PropTypes.string,
  isOpen: PropTypes.bool
}
