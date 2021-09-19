import React, {useState, useContext, useEffect} from 'react'
import axios from 'axios'
import {GlobalState} from '../../GlobalState'
import Loading from '../utils/loading/Loading'
import {useHistory, useParams} from 'react-router-dom'
import './createPackage.css';

const initialState = {
    package_id: '',
    PackageName: '',
    price: 0,
    description: 'MERN Stack is a Javascript Stack that is used for easier and faster deployment ' +
        'of full-stack web applications. MERN Stack comprises of 4 technologies namely: MongoDB, Express,' +
        ' React and Node.js. It is designed to make the development process smoother and easier..',
    _id: ''
}

//file for it dvdvsdvrwvrsavd

function CreatePackage() {

    const [vehiclepackage, setVehiclepackage] = useState(initialState)
    const state = useContext(GlobalState)
    const [images, setImages] = useState(false)
    const [loading, setLoading] = useState(false)
    const [package1] = state.productsAPI.package1
    const [categories] = state.categoriesAPI.categories



    const history = useHistory()


    const param = useParams()


    useEffect(() => {
        if(param.id){
            setOnEdit(true)
            package1.forEach(product => {
                if(product._id === param.id) {
                    setVehiclepackage(product)
                    setImages(product.images)
                }
            })
        }else{
            setOnEdit(false)
            setVehiclepackage(initialState)
            setImages(false)
        }
    }, [param.id, package1])




    const [onEdit, setOnEdit] = useState(false)




    const handleUpload = async e =>{
        e.preventDefault()
        try {

            const file = e.target.files[0]

            if(!file) return alert("File not exist.")

            if(file.size > 1024 * 1024) // 1mb
                return alert("Size too large!")

            if(file.type !== 'image/jpeg' && file.type !== 'image/png') // 1mb
                return alert("File format is incorrect.")

            let formData = new FormData()
            formData.append('file', file)

            setLoading(true)
            const res = await axios.post('/image/imgUpload', formData, {
                headers: {'content-type': 'multipart/form-data'}
            })
            setLoading(false)
            setImages(res.data)

        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const handleDestroy = async () => {
        try {

            setLoading(true)
            await axios.post('/image/delete', {public_id: images.public_id})
            setLoading(false)
            setImages(false)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const handleChangeInput = e =>{
        const {name, value} = e.target
        setVehiclepackage({...vehiclepackage, [name]:value})
    }

    const handleSubmit = async e =>{
        e.preventDefault()
        try {
            if(!images) return alert("No Image Upload")

            if(onEdit){
                await axios.put(`/package/updatePackage/${vehiclepackage._id}`, {...vehiclepackage, images})
            }else{
                await axios.post('/package/addPackage', {...vehiclepackage, images})
            }

            history.push("/adminPackages")
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const styleUpload = {
        display: images ? "block" : "none"
    }
    return (
        <div className="create_product">
            <div className="upload">
                <input type="file" name="file" id="file_up" onChange={handleUpload}/>
                {
                    loading ? <div id="file_img"><Loading /></div>

                        :<div id="file_img" style={styleUpload}>
                            <img src={images ? images.url : ''} alt=""/>
                            <span onClick={handleDestroy}>X</span>
                        </div>
                }

            </div>



            <form onSubmit={handleSubmit}>
                <div className="row">
                    <label htmlFor="package_id">Package ID</label>
                    <input type="text" name="package_id" id="package_id" required
                           value={vehiclepackage.package_id} onChange={handleChangeInput} disabled={onEdit} />
                </div>

                <div className="row">
                    <label htmlFor="PackageName">Package Name</label>
                    <input type="text" name="PackageName" id="PackageName" required
                           value={vehiclepackage.PackageName} onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="price">Package Price</label>
                    <input type="number" name="price" id="price" required
                           value={vehiclepackage.price} onChange={handleChangeInput} />
                </div>


                <div className="row">
                    <label htmlFor="description">Description</label>
                    <textarea type="text" name="description" id="description" required
                              value={vehiclepackage.description} rows="5" onChange={handleChangeInput} />
                </div>



                <button type="submit">{onEdit? "Update" : "Create Package"}</button>
            </form>
        </div>
    )
}

export default CreatePackage
