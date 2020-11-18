import React, { useState } from 'react'
import { AUTH, STORAGE, STORE } from '../Firebase';
import ImageUploading from 'react-images-uploading';
import './forms.css'
import firebase from "firebase/app"

export default function Signup() {
    const [signDetails, setSignDetails] = useState({
        image: []
    })
    
    const storageRef = STORAGE.ref();
    const usersStore = STORE.collection('users')

    const signup = React.useCallback(async (e) => {
        e.preventDefault()
        try {
            //auth signup
            await AUTH.createUserWithEmailAndPassword(signDetails.email, signDetails.password)
                    

            //image storage
            const imagesRef = storageRef.child('images')

            const imageResponse = await imagesRef.child(`${signDetails.name}-profileImage`)
                                        .putString(signDetails.image[0]['data_url'], 'data_url', {contentType:'image'})

            //add user to database
            await usersStore.add({
                name: signDetails.name,
                email: signDetails.email,
                profileImage: imageResponse.metadata.fullPath
            })
            
            setSignDetails({image:[]})
            e.target.reset()

        } catch(error){
            console.log(error)
            alert(error.message)
        }
        
    }, [signDetails])

    
    return (
        <>
            <form id='signupForm' onSubmit={(e) => signup(e)}>  
                <div className='emailRow'>
                    <label className='signupRowLabel'>Email: </label>
                    <input 
                        required
                        onChange={(e) => setSignDetails({...signDetails, email: e.target.value})}
                        type='email' 
                        className='signupRowLabel' 
                        placeholder='email'>
                </input>
                </div>
                <div className='passwordRow'>
                    <label className='signupRowLabel'>Password: </label>
                    <input 
                        required
                        onChange={(e) => setSignDetails({...signDetails, password: e.target.value})}
                        type='password' 
                        className='signupRowLabel' 
                        placeholder='password'>
                    </input>
                </div>
                <div className='nameRow'>
                    <label className='signupRowLabel'>Full Name: </label>
                    <input 
                        required
                        onChange={(e) => setSignDetails({...signDetails, name: e.target.value})}
                        type='text' 
                        className='signupRowLabel' 
                        placeholder='full name'>    
                    </input>
                </div>
                <div className='imageRow'>
                    {signDetails &&
                        <ImageUploading
                        multiple
                        value={signDetails.image}
                        onChange={(image) => setSignDetails({...signDetails, image })}
                        maxNumber={1}
                        dataURLKey="data_url"
                      >
                        {({ onImageUpdate }) => (
                          <div 
                            onClick={onImageUpdate}
                            className='profileImageContainer'>
                                <img 
                                    src={signDetails.image[0] ? signDetails.image[0]['data_url'] : 'https://cdn0.iconfinder.com/data/icons/social-media-network-4/48/male_avatar-512.png'}
                                    className='profileImage'
                                    alt='click to choose'>
                                </img>
                          </div>
                        )}
                      </ImageUploading>
                    }
                </div> 
                <button type='submit'>Submit</button>
            </form>
        </>
    )
}
