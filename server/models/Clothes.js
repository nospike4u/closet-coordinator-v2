import { Schema, model } from "mongoose";

const clothesSchema = new Schema(
  {
    category: {
      type: String,
      // required: true,
      trim: true,
    },
    type: {
      type: String,
      // required: true,
      trim: true,
    },
    color: {
      type: String,
      // required: true,
      trim: true,
    },
    season: {
      type: String,
      // required: true,
      trim: true,
    },
    occasion: {
      type: String,
      // required: true,
      trim: true,
    },

    energyLevel: {
      type: String,
      // required: true,
      trim: true,
    },

    img: {
      type: String,
      // required: true,
      default:
        "https://img.freepik.com/free-photo/user-profile-icon-front-side-with-white-background_187299-40010.jpg?t=st=1721037053~exp=1721040653~hmac=b100a5fe2292042e955bb460b1597a97ca1c04f5991dec15c7a3e2cd8c53022c&w=740",
    },
  },
  {
    timestamps: true,
  }
);

const Clothes = model("Clothes", clothesSchema);

export default Clothes;

// import { Schema, model } from "mongoose";

// const clothesSchema = new Schema(
//   {
//     category: {
//         type: String,
//         required: true,
//         trim: true,
//     },
//     type: {
//         type: String,
//         required: true,
//         trim: true,
//     },
//     color: {
//         type: String,
//       required: true,
//       trim: true,
//     },
//     seasons: {
//         type: String,
//       required: true,
//       trim: true,
//     },
//     occassion: {
//         type: String,
//       required: true,
//       trim: true,
//     },

//     energyLevel: {
//         type: String,
//       required: true,
//       trim: true,
//     },

//     img: {
//         type: String,
//         required: true,
//       default:
//         "https://img.freepik.com/free-photo/user-profile-icon-front-side-with-white-background_187299-40010.jpg?t=st=1721037053~exp=1721040653~hmac=b100a5fe2292042e955bb460b1597a97ca1c04f5991dec15c7a3e2cd8c53022c&w=740",
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// const Clothes = model("Clothes", clothesSchema);

// export default Clothes;
