import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getBySlug, sendRouterProps,getLatestPost } from '../actions'

class Post extends Component {
  componentDidMount(){
    let item 
    if(this.props.item){
      item = {
        id: this.props.item.id,
        date: this.props.item.date,
        title:this.props.item.title,
        body: this.props.item.body,
        url: this.props.item.url,
        slug: this.props.item.slug
      }
    }else{
      item = {
        id:"",
        date: "",
        title: "",
        body: "",
        url: "",
        slug: ""
      }
    }
    this.props.dispatch(sendRouterProps(item))
    this.props.dispatch(getBySlug(this.props.match.params.slug))
    this.props.dispatch(getLatestPost(this.props.match.params.slug))
  }

  render() {
    return (
      <div>
        <header id="header">
          <h1><a href="/">Offline Blog</a></h1>
        </header>

        <main id="content" role="main">
                
          <article>
            <h1>{this.props.news.currentItem.title}</h1>
            <p>Posted on {this.props.news.currentItem.date}</p>
            <div dangerouslySetInnerHTML={{__html: this.props.news.currentItem.body}}/>
          </article>

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
export default connect(mapStateToProps)(Post)