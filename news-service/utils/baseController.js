const express = require('express');


const baseController = (handler, params) => async(req, res) => {
    console.log(`got request to url: ${req.url}`)
    console.log(`got request with body: ${JSON.stringify(req.body)}`)
    try {
        let handlerParams = {}
        if (params.body){
            handlerParams = {
                ...handlerParams,
                ...req.body
            }
        }
        if (params.query){
            handlerParams = {
                ...handlerParams,
                ...req.query
            }
        }
        if (params.params){
            handlerParams = {
                ...handlerParams,
                ...req.params
            }
        }
        if (req.headers.authorization?.split(' ')[1]) {
            handlerParams.token = req.headers.authorization.split(' ')[1];
        }
        console.log(`Calling ${handler.name} with params: ${JSON.stringify(handlerParams)}`)
        const result = await handler(handlerParams);
        console.log(`result is: ${JSON.stringify(result)}`)
        if(result["password"]) {
            result["password"] = null;
        }
        if (result.user?.password) {
            result.user.password = null;
        }
        res.status(params.successStatus ?? 200).json(result);
    } catch (error) {

        console.error(`Error in ${handler.name}: ${error.message}\n${error.stack}`)
        if (error.name === 'LogicError'){
            return res.status(error.statusCode ?? 400).json({ error: error.message });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = baseController;
