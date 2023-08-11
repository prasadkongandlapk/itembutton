import './index.css'

const SimilarProductItem = props => {
  const {similarDetails} = props
  const {imageUr, titl, bran, pric, ratin} = similarDetails

  return (
    <div className="afdjlkfdjklas">
      <img className="lkjfdsa" src={imageUr} alt={titl} />
      <p className="dskjl">{titl}</p>
      <p className="fdjlks">by{bran}</p>
      <p className="dskjl">Rs {pric}/-</p>
      <div className="lkjdfsa">
        <p>{ratin}</p>
        <img
          className="dfsalkj"
          src="https://assets.ccbp.in/frontend/react-js/star-img.png "
          alt="star"
        />
      </div>
    </div>
  )
}
export default SimilarProductItem
