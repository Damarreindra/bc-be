const Player = require('../Models/Player')

exports.createPlayer = async(req, res) =>{
    try {
        const player = new Player(req.body);
        await player.save();
        res.status(201).send({
          message: "Posted",
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.getChamps = async(req, res) =>{
  try{
    const champs = await Player.find().sort({"wins":-1})
    res.status(201).json(champs)
  }catch(err){
    res.status(400).json({ message: err.message });
  }

}


exports.getAllPlayers = async (req, res) => {
    try {
      const players = await Player.find();
      res.json(players);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  exports.deletePlayer = async(req, res) =>{
    try{
      const {id} = req.params
      const player = await Player.findByIdAndDelete(id);
      if(!player){
        return res.status(404).json({message:"Not Found"})
      }
      res.status(200).json({message:"Player Deleted"})
    }catch(err){
      res.status(500).json({message:err.message})
    }
  }