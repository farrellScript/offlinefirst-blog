import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { updateProductStore,populateStore } from '../actions'

class Home extends Component {
  constructor(props){
    super(props)
  }
  componentWillMount(){
    this.props.dispatch(populateStore())
    this.props.dispatch(updateProductStore())
  }
  render() {
    const items = this.props.news.allItems.map(function(item){
      return <li key={item.id}><Link to={`/news/${item.slug}`} item={item}>{item.title}</Link></li>;
    })
    return (
      <div>
 		<header id="header">
			<h1><a href="/">Offline Blog</a></h1>
		</header>

		<main id="content" role="main">
            <h1>Welcome!</h1>
    
            <p>It’s true, this site doesn’t have a whole lot of content yet, but don’t worry. Our web developers have just installed the CMS, and they’re setting things up for the content editors this very moment. Soon Localhost will be an oasis of fresh perspectives, sharp analyses, and astute opinions that will keep you coming back again and again.</p>

            <h2>Recent News</h2>
            <ul>
                {items}
            </ul>
		</main>

		<footer id="footer">
			Copyright 2018. All rights reserved  •  Built with <a href="http://craftcms.com">Craft</a>
		</footer>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    news: state.news
  }
}
export default connect(mapStateToProps)(Home)