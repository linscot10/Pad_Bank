const testRoute = async (req, res) => {

    try {
        await res.status(200).json({
            success: true,
            message: "set up and ready"
        })
    } catch (error) {
        console.error("route not Found", error)
    }

}

module.exports = {
    testRoute
}