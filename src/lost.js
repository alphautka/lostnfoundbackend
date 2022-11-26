
const asyncHandler = require('express-async-handler')

const getAllLosts = asyncHandler(async (req, res) => { 
    const userId = await lost_locations.findById(u_id)

    if (!u_id?.length) {
        return res.status(400).json({ message: 'No userId found' })
    }

    res.json(userId)
})

const createNewLost = asyncHandler(async (req, res) => {
    const { u_id, lat, long, data_lost, date_found, item_id, found_item_id, type } = req.body

    if (!u_id || !lat || !long || !date_lost) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    const duplicate = await lost_locations.findOne({ u_id }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate losts' })
    }

    const lostObject = { u_id, lat, long, data_lost, date_found, item_id, found_item_id, type }

    // Create and store new user 
    const lost = await lost_locations.create(lostObject)

    if (lost) { //created 
        res.status(201).json({ message: `New lost ${lost} created` })
    } else {
        res.status(400).json({ message: 'Invalid lost data received' })
    }
})

const updateLost = asyncHandler(async (req, res) => {
    const { u_id, lat, long, data_lost, date_found, item_id, found_item_id, type } = req.body

    // Confirm data 
    if (!u_id || !lat || !long || !date_lost ) {
        return res.status(400).json({ message: 'All fields except password are required' })
    }

    const lost = await lost_locations.findById(id).exec()

    if (!lost) {
        return res.status(400).json({ message: 'Lost not found' })
    }

    const duplicate = await lost_locations.findOne({ username }).lean().exec()

    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate losts' })
    }

    const updatedLost = await lost.save()

    res.json({ message: `${updatedLost.lost} updated` })
})


const deleteLost = asyncHandler(async (req, res) => {
    const { id } = req.body

    if (!id) {
        return res.status(400).json({ message: 'Lost ID Required' })
    }

    const lost = await lost_locations.findById(id).exec()

    if (!lost) {
        return res.status(400).json({ message: 'Lost not found' })
    }

    const result = await lost.deleteOne()

    const reply = `Your ${result.lost} with ID ${result._id} deleted`

    res.json(reply)
})

module.exports = {
    getAllLosts,
    createNewLost,
    updateLost,
    deleteLost
}