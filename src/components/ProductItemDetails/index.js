import './index.css'
import {Component} from 'react'
import {Cookies} from 'js-cookie'

class ProductItemDetails extends Component {
  state = {count: '', itemData: '', formatedSimilarProducts: ''}

  componentDidMount() {
    this.getProductItem()
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
        rating: data.rating,
        availability: data.availability,
      }
      const formatedSimilarProducts = data.similar_products.map(each => ({
        id: each.id,
        imageUrl: each.image_url,
        title: each.title,
        style: each.style,
        price: each.price,
        description: each.description,
        brand: each.brand,
        totalReviews: each.total_reviews,
        rating: each.rating,
        availability: each.availability,
      }))

      this.setState({
        itemData: formatedProductItem,
        similarProductsData: formatedSimilarProducts,
      })
    }
  }

  render() {
    const {itemData} = this.state
    const {imageUrl, title} = itemData
    return (
      <div>
        <img src={imageUrl} alt={title} />
      </div>
    )
  }
}

export default ProductItemDetails
