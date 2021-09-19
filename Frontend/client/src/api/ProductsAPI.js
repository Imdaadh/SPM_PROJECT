import {useState, useEffect} from 'react'
import axios from 'axios'


function ProductsAPI() {
    const [products, setProducts] = useState([])
    const [package1, setPackage1] = useState([])
    const [callback, setCallback] = useState(false)
    const [category, setCategory] = useState('')
    const [sort, setSort] = useState('')
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const [result, setResult] = useState(0)

    useEffect(() =>{
        const getProducts = async () => {
            const res = await axios.get(`/product/getProducts?limit=${page*18}&${category}&${sort}&title[regex]=${search}`)
            setProducts(res.data.products)
            setResult(res.data.result)
        }
        getProducts()
    },[callback, category, sort, search, page])


    useEffect(() =>{
        const getPackage = async () => {
            const res = await axios.get(`/package/getPackage?limit=${page*18}&PackageName[regex]=${search}`)
            setPackage1(res.data.products)
            setResult(res.data.result)
        }
        getPackage()
    },[callback, category, sort, search, page])



    return {
        products: [products, setProducts],
        package1: [package1, setPackage1],
        callback: [callback, setCallback],
        category: [category, setCategory],
        sort: [sort, setSort],
        search: [search, setSearch],
        page: [page, setPage],
        result: [result, setResult]
    }
}

export default ProductsAPI
