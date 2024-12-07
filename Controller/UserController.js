import prisma from "../DB/db.config.js";

export const createSchool = async(req,res)=>{
    const {Name, address, latitude, longitude}= req.body

    const findSchool = await prisma.school.findUnique({
        where:{
            Name:Name
        }
    })
    if(findSchool){
        return res.json({status:400, message:"School Already exists"})
    }

    const addSchool =await prisma.school.create({
        data:{
            Name:Name,
            address:address,
            latitude:latitude,
            longitude: longitude
        }
    })
    return res.json({status:200, data:addSchool, message:"User Created"})
}


export const getSchools = async(req,res)=>{
    const userLatitude = parseFloat(req.query.lat)
    const userLongitude = parseFloat(req.query.long)
    const schools = await prisma.school.findMany({});
    let calculateDistance = (lat1, lon1, lat2, lon2) => {
        const toRadians = (deg) => deg * (Math.PI / 180);
        const R = 6371;
        const dLat = toRadians(lat2 - lat1);
        const dLon = toRadians(lon2 - lon1);
      
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(toRadians(lat1)) *
            Math.cos(toRadians(lat2)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
      
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    };
    const sortedData = schools
    .map((location) => ({
      ...location,
      distance: calculateDistance(
        userLatitude,
        userLongitude,
        location.latitude,
        location.longitude
      ),
    }))
    .sort((a, b) => a.distance - b.distance);
    return res.json({status:200, data:sortedData})
}