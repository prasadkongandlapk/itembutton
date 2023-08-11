import './index.css'
import {Loader} from 'react-loader-spinner'

import {Component} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'
import SimilarProductItem from '../SimilarProductItem'

const status = {
  loading: 'LOADING',
  failure: 'FAILURE',
  success: 'SUCCESS',
}

class ProductItemDetails extends Component {
  state = {
    count: 1,
    apiStatus: status.loading,
    itemData: {},
    similarProductsData: [],
  }

  componentDidMount() {
    this.getProductItem()
  }

  onContinueBtn = () => {
    const {history} = this.props
    history.replace('/products')
  }

  getProductItem = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/products/${id}`

    const token = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const formatedProductItem = {
        id: data.id,
        imageUrl: data.image_url,
        title: data.title,
        brand: data.brand,
        totalReviews: data.total_reviews,
        rating: data.rating,
        price: data.price,
        description: data.description,
        availability: data.availability,
      }
      const formatedSimilarProducts = data.similar_products.map(each => ({
        id: each.id,
        imageUr: each.image_url,
        titl: each.title,
        styl: each.style,
        pric: each.price,
        descriptio: each.description,
        bran: each.brand,
        totalReview: each.total_reviews,
        ratin: each.rating,
        availabilit: each.availability,
      }))

      this.setState({
        itemData: formatedProductItem,
        similarProductsData: formatedSimilarProducts,
        apiStatus: status.success,
      })
    } else {
      this.setState({apiStatus: status.failure})
    }
  }

  onIncreaseBtn = () => {
    this.setState(PrevState => ({count: PrevState.count + 1}))
  }

  onDecreaseBtn = () => {
    this.setState(PrevState => ({count: PrevState.count - 1}))
  }

  failureView = () => (
    <div className="adfjksl">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png "
        alt="failure view"
      />
      <h1>Product Not Found</h1>
      <button className="minus" type="button" onClick={this.onContinueBtn}>
        Continue Shopping
      </button>
    </div>
  )

  loadingView = () => (
    <div data-testid="loader" className="fldjksa">
      <Loader type="ThreeDots" />
    </div>
  )

  successView = () => {
    const {itemData, similarProductsData, count} = this.state

    const {
      imageUrl,
      price,
      description,
      rating,
      availability,
      brand,
      totalReviews,
      title,
      failureView,
    } = itemData
    return (
      <div>
        <div className="kdfjls">
          <img className="dfasjl" src={imageUrl} alt={title} />
          <div className="lkfdasj">
            <h3>{title}</h3>
            <p className="price">Rs {price}/-</p>
            <div className="dflsjk">
              <div className="lkjdfsa">
                <p>{rating}</p>
                <img
                  className="dfsalkj"
                  src="https://assets.ccbp.in/frontend/react-js/star-img.png "
                  alt="star"
                />
              </div>
              <p>{totalReviews} reviews</p>
            </div>
            <p className="description">{description}</p>
            <div className="fkdslja">
              <p className="fkdslj">Available: </p>
              <p className="fdjlks">{availability}</p>
            </div>
            <div className="fkdslja">
              <p className="fkdslj">Brand: </p>
              <p className="fdjlks"> {brand}</p>
            </div>
            <hr />
            <div className="dfalksj">
              <button
                className="minus"
                type="button"
                onClick={this.onDecreaseBtn}
              >
                -
              </button>
              <p className="count">{count}</p>
              <button
                type="button"
                onClick={this.onIncreaseBtn}
                className="minus"
              >
                +
              </button>
            </div>
            <p className="btn">ADD TO CART</p>
          </div>
        </div>
        <h3 className="slfdl">Similar Products</h3>
        <div className="kljdfsa">
          {similarProductsData.map(each => (
            <SimilarProductItem similarDetails={each} key={each.id} />
          ))}
        </div>
      </div>
    )
  }

  renderProducts = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case status.loading:
        return this.loadingView()
      case status.success:
        return this.successView()
      case status.failure:
        return this.failureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="fadskjl">
        <Header />
        {this.renderProducts()}
      </div>
    )
  }
}

export default ProductItemDetails
