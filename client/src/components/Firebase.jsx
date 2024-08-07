import { useState, useEffect } from "react";
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import { storage } from "../utils/firebase";
import { v4 } from "uuid";

function FireBase() {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const [imageUrl, setImageUrl] = useState("");

  const imagesListRef = ref(storage, "images/");

  const uploadFile = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrls((prev) => [...prev, url]);
      });
    });
  };

  useEffect(() => {
    return () => {
      const getImage = async () => {
        const singleImageRef = ref(storage);

        await getDownloadURL(singleImageRef).then((res) => {
          setImageUrl(res);
        });
      };

      getImage();

      listAll(imagesListRef).then((response) => {
        response.items.forEach((item) => {
          getDownloadURL(item).then((url) => {
            setImageUrls((prev) => [...prev, url]);
          });
        });
      });
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
      <button onClick={uploadFile}> Upload Image</button>
      {imageUrls?.map((url, i) => {
        return <img key={i} alt={i} src={url} />;
      })}
    </div>
  );
}

export default FireBase;
