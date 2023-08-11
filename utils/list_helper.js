const dummy = (blogs) => { 
  if (blogs) {
    return 1
  }
}

const totalLikes = (blogs) => {
  const array = blogs.map(blog => blog.likes)
  return array.reduce((a, b) => a + b, 0)
}
  
module.exports = {
  dummy,
  totalLikes
}