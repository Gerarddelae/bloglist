const _ = require("lodash")

const dummy = (blogs) => { 
  if (blogs) {
    return 1
  }
}

const totalLikes = (blogs) => {
  const array = blogs.map(blog => blog.likes)
  return array.reduce((a, b) => a + b, 0)
}

const favoriteBlog = (blogs) => {

  const response = blogs.reduce((fav, blog) => (fav.likes > blog.likes ?  fav : blog))
  
  return {
    title: response.title,
    author: response.author,
    likes: response.likes
  }
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return "blog list is empty"
  }

  const topAuthor = _.chain(blogs)
    .groupBy("author").map((group, author) => {
      return { author: author , blogs: group.length}
    }).maxBy((object) => object.blogs).value()
  

  return topAuthor
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return "blog list is empty"
  }

  const topAuthor = _.chain(blogs).groupBy("author")
    .map((group, author) => {
      return {
        author: author,
        likes: group.reduce((acc, next) => {
          return (acc += next.likes)
        }, 0)
      }
    }).maxBy((object) => object.likes).value()

  return topAuthor
}
  
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes  
}