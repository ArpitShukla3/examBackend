import Marks from "../Schema/Marks.js";

export default async function dashboard(req,res)
{
    try {
        const agg =[
            {
              '$match': {
                'Clerk_id': req.headers.authorization              
              }
            }, {
              '$group': {
                '_id': null, 
                'average': {
                  '$avg': '$marksObtained'
                }, 
                'positive_average': {
                  '$avg': '$positiveMarks'
                }, 
                'negative_average': {
                  '$avg': '$negativeMarks'
                }, 
                'max': {
                  '$max': '$marksObtained'
                }, 
                'count': {
                  '$sum': 1
                }
              }
            }
          ];
          const data =await Marks.aggregate(agg);
          // const marksList = await Marks.find({Clerk_id:req.headers.authorization});
          return res.status(200).json({data});
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}

