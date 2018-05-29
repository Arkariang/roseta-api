var ObjectID = require('mongodb').ObjectID;

module.exports = (app,db) => {
    app.post('/translation', (req,res)=> {
        const text = {text:req.body.translation};
        if (text.text !== undefined) {
            db.collection('translations').insert(text,(err,result) => {
                if (err) {
                    res.send('cosa chunga paso bro!');
                } else {
                    res.send(result.ops[0]);
                }
            });
        } else {
            res.send('undefined');
        }
    });

    app.get('/translation/:id', (req, res) => {
        const id = req.params.id;
        const det = {'_id': new ObjectID(id)};
        
        db.collection('translations').findOne(det, (err,result) => {
            if(err) {
                console.log('err');
                res.send({'err':'something happend'});
            } else {
                console.log('result ok');
                res.send(result);
            }
        });
    });

    app.delete('/translation/:id', (req, res) => {
    
        const id = req.params.id;
        const det = {'_id': new ObjectID(id)};
        
        db.collection('translations').remove(det, (err, item) => {
            if (err) {
              res.send({'error':'An error has occurred'});
            } else {
              res.send('translation ' + id + ' deleted!');
            } 
        });
    });

    app.put('/translation/:id', (req, res) => {
    
        const id = req.params.id;
        const det = {'_id': new ObjectID(id)};

        const objectToUpdate = {text:req.body.translation};
        
        db.collection('translations').update(det,objectToUpdate,(err, item) => {
            if (err) {
              res.send({'error':'An error has occurred'});
            } else {
              res.send('translation ' + id + ' updated!');
            } 
        });
    });
}

