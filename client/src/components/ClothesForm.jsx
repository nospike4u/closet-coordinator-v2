import { useState, useEffect } from "react";
import Firebase from "./Firebase";
import { useUserContext } from "../contexts/userContext.jsx";
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import { storage } from "../utils/firebase.jsx";
import { v4 } from "uuid";
import axios from "axios";
import { useAuthContext } from "../contexts/authContext";

const ClothesForm = ({ setMessages, messages }) => {
  const { url } = useAuthContext();
  const { user, clothes, setClothes } = useUserContext();
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [form, setForm] = useState({
    category: "",
    type: "",
    color: "",
    season: "",
    occasion: "",
    img: "",
    energyLevel: "",
  });

  //  const url=import.meta.env.VITE_URL
  const url = `${url}/api/v1`;

  const handleSubmit = async () => {
    await uploadFile();
  };

  const imagesListRef = ref(storage, "images/");

  // const onChange=(e)=>{
  //   setForm((pre)=>{
  //     ...pre,img:
  //   })
  // }

  // const handleForm = (e) => {
  //   console.log("HandleForm",form)

  //   setForm({...form,[e.target.name]:[e.target.value]})
  //   }

  const uploadFile = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
 
    uploadBytes(imageRef, imageUpload).then((snapshot) => {

      getDownloadURL(snapshot.ref).then((url) => {
     
        setForm({ ...form, img: url });
      });
    });
  };

  useEffect(() => {
    const addClothes = async () => {
      const { data } = await axios.post(`${url}/clothes`, form);
 
    };
    addClothes();

  }, [form.img]);

  useEffect(() => {
    return () => {
      const getImage = async () => {
        const singleImageRef = ref(storage);

        await getDownloadURL(singleImageRef).then((res) => {
          setImageUrl(res);
        });
      };

      getImage();

      // listAll(imagesListRef).then((response) => {
      //   response.items.forEach((item) => {
      //     getDownloadURL(item).then((url) => {
      //       setImageUrls((prev) => [...prev, url]);
      //     });
      //   });
      // });
    };
  }, []);

  return (
    <div className="App">
      {imageUrl && <img alt={"i"} src={imageUrl} />}
      <input
        type="file"
        onChange={(event) => {
          setImageUpload(event.target.files[0]);
        }}
      />
      {/* <button onClick={uploadFile}> Upload Image</button> */}

      {/* <div className="flex flex-col items-center justify-center p-4 space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Upload Image</label>
        <input 
          type="file" 
          required
          onChange={handleImageChange} 
          className="block w-full text-sm text-gray-900 rounded-lg border border-gray-300 cursor-pointer focus:outline-none"
          />
          
          {imagePreviewUrl && (
            <div className="mt-4">
            <img 
            src={imagePreviewUrl} 
            alt="Preview" 
            className="object-scale-down h-48 w-96"
            />
            </div>
            )}
            
      </div> */}

      {/* Category */}
      <div>
        <label className="block text-sm font-medium text-red-700">
          Clothes Category
        </label>
        <select
          name={"category"}
          value={form.category}
          required
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="block w-full mt-1 text-sm rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          <option value="">Select a category</option>
          <option value="shirt">Shirt</option>
          <option value="pants">Pants</option>
          <option value="jacket">Jacket</option>
          <option value="shoes">Shoes</option>
        </select>
      </div>

      <div className="border">
        <label className="block text-sm font-medium text-green-700">
          Types
        </label>
        <select
          value={form.occasion}
          required
          onChange={(e) => setForm({ ...form, type: e.target.value })}
          className="block w-full mt-1 text-sm rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          <option value="">Select an occasion</option>
          <option value="sports">Vest</option>
          <option value="holiday">short sleaves</option>
          <option value="formal">Long Sleaves</option>
          <option value="informal">Blues</option>
        </select>
      </div>

      <div className="border">
        <label className="block text-sm font-medium text-blue-700">
          Occasions
        </label>
        <select
          value={form.occasion}
          name="occasion"
          required
          onChange={(e) => setForm({ ...form, occasion: e.target.value })}
          className="block w-full mt-1 text-sm rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          <option value="">Select an occasion</option>
          <option value="sports">Sports</option>
          <option value="holiday">Holiday</option>
          <option value="formal">Formal</option>
          <option value="informal">Informal</option>
        </select>
      </div>

      <button
        // disabled={!isSaveEnabled}
        // className={`mt-4 w-full text-white font-bold py-2 px-4 rounded ${isSaveEnabled ? 'bg-blue-500 hover:bg-blue-700' : 'bg-gray-500 cursor-not-allowed'}`}
        className={`mt-4 w-full text-red font-bold py-2 px-4 rounded`}
        onClick={handleSubmit}
      >
        Save
      </button>
    </div>
  );
};

export default ClothesForm;
