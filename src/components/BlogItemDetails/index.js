import {Component} from 'react'
import Loader from 'react-loader-spinner'

import './index.css'

class BlogItemDetails extends Component {
  state = {blogItemDetails: {}, isLoading: true}

  componentDidMount() {
    this.getBlogItemData()
  }

  getBlogItemData = async () => {
    const {match} = this.props
    const {params} = match
    const {blogId} = params
    const response = await fetch(`https://apis.ccbp.in/blogs/${blogId}`)
    const blogItemDetails = await response.json()
    const updatedBlogItemDetails = {
      id: blogItemDetails.id,
      imageUrl: blogItemDetails.image_url,
      title: blogItemDetails.title,
      author: blogItemDetails.author,
      avatarUrl: blogItemDetails.avatar_url,
      content: blogItemDetails.content,
      topic: blogItemDetails.topic,
    }
    this.setState({blogItemDetails: updatedBlogItemDetails, isLoading: false})
  }

  renderBlogItemDetails = () => {
    const {blogItemDetails, isLoading} = this.state
    const {title, imageUrl, content, avatarUrl, author} = blogItemDetails
    return isLoading ? (
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    ) : (
      <div className="blog-info">
        <h2 className="blog-details-title">{title}</h2>
        <div className="author-details">
          <img className="author-pic" src={avatarUrl} alt={author} />
          <p className="details-author-name">{author}</p>
        </div>
        <img className="blog-image" src={imageUrl} alt={title} />
        <p className="blog-content">{content}</p>
      </div>
    )
  }

  render() {
    return <div className="blog-container">{this.renderBlogItemDetails()}</div>
  }
}

export default BlogItemDetails
