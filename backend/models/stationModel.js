const mongoose = require('mongoose')

const stationSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    coords: {
      lat: {
        type: Number
      },
      lng: {
        type: Number
      }
    },
    scooters: [
        {
            batteryLevel: {
                type: Number,
                default: 100
            },
            stationId: {
                type: mongoose.Schema.ObjectId,
                default: null
            },
            reservedUserId: {
                type: mongoose.Schema.ObjectId,
                default: null
            }
        }
    ]
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Station', stationSchema);