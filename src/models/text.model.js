import mongoose from "mongoose";

const homepageSchema = new mongoose.Schema(
  {
    hero: {
      title: {
        type: String,
        required: true,
        trim: true,
      },
    },

    expert: {
      paragraph: {
        type: String,
        required: true,
      },
      expertiseTypes: [
        {
          type: String,
          required: true,
        },
      ],
    },

    overview: {
      heading: {
        type: String,
        required: true,
      },
      paragraph: {
        type: String,
        required: true,
      },
      statistics: {
        projects: {
          type: Number,
          required: true,
        },
        awards: {
          type: Number,
          required: true,
        },
      },
    },

    digitalPartners: {
      title: {
        type: String,
        required: true,
      },
      paragraph: {
        type: String,
        required: true,
      },
      yearsInMarket: {
        type: Number,
        required: true,
      },
      satisfiedCustomers: {
        type: Number,
        required: true,
      },
    },

    team: {
      paragraph: {
        type: String,
        required: true,
      },
      statistics: {
        fiveStarReviews: {
          type: Number,
          required: true,
        },
        expertCount: {
          type: Number,
          required: true,
        },
      },
      story: {
        type: String,
        required: true,
      },
    },

    bigSection: {
      heading: {
        type: String,
        required: true,
      },
    },

    services: {
      serviceTypes: [
        {
          name: {
            type: String,
            required: true,
          },
        },
      ],
    },

    footer: {
      paragraph: {
        type: String,
        required: true,
      },
      contact: {
        phoneNumber: {
          type: String,
          required: true,
        },
        address: {
          type: String,
          required: true,
        },
        email: {
          type: String,
          required: true,
          match: [/\S+@\S+\.\S+/, "Please enter a valid email"],
        },
      },
    },
  },
  { timestamps: true }
);

export const Homepage = mongoose.model("Homepage", homepageSchema);
