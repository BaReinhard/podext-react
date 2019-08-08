import React from 'react'
import Authentication from '../../util/Authentication/Authentication'

import './App.css'

export default class App extends React.Component{
    constructor(props){
        super(props)
        this.Authentication = new Authentication()

        //if the extension is running on twitch or dev rig, set the shorthand here. otherwise, set to null. 
        this.twitch = window.Twitch ? window.Twitch.ext : null
        this.state={
            finishedLoading:false,
            theme:'light',
            isVisible:true
        }
    }

    contextUpdate(context, delta){
        if(delta.includes('theme')){
            this.setState(()=>{
                return {theme:context.theme}
            })
        }
    }

    visibilityChanged(isVisible){
        this.setState(()=>{
            return {
                isVisible
            }
        })
    }

    componentDidMount(){
        if(this.twitch){
            this.twitch.onAuthorized((auth)=>{
                this.Authentication.setToken(auth.token, auth.userId)
                if(!this.state.finishedLoading){
                    // if the component hasn't finished loading (as in we've not set up after getting a token), let's set it up now.

                    // now we've done the setup for the component, let's set the state to true to force a rerender with the correct data.
                    this.setState(()=>{
                        return {finishedLoading:true}
                    })
                }
            })

            this.twitch.listen('broadcast',(target,contentType,body)=>{
                this.twitch.rig.log(`New PubSub message!\n${target}\n${contentType}\n${body}`)
                // now that you've got a listener, do something with the result... 

                // do something...

            })

            this.twitch.onVisibilityChanged((isVisible,_c)=>{
                this.visibilityChanged(isVisible)
            })

            this.twitch.onContext((context,delta)=>{
                this.contextUpdate(context,delta)
            })
        }
    }

    componentWillUnmount(){
        if(this.twitch){
            this.twitch.unlisten('broadcast', ()=>console.log('successfully unlistened'))
        }
    }
    
    render(){
        if(this.state.finishedLoading && this.state.isVisible){
            return (
                <div className="pod-live-conf">
        <div className="pod-live-conf-header">
            <div className="pod-live-conf-title">POD Armory</div>
        </div>
        <div className="pod-live-conf-body">
            <div id="message" className="message">
                <div className="message--text"></div>
                <div className="message--close">close</div>
            </div>
            <div id="loader" className="loader">
                <img className="loader-img" alt="loading..." width="40" height="40" src="img/loader.gif" />
                <p className="loader-text">loading...</p>
            </div>
            <div className="pod-live-conf-body-content">
                <div className="pod-live-conf-current-name">Live with:<span id="currentAccname" className="pod-live-conf-name-title"></span></div>
                <hr />
                <input id="podAccname" className="pod-live-conf-input" type="text" placeholder="Enter your pod account name" val="" />
                <button id="submitChar"onClick={()=>this.Twitch.ext.rig.log("Submitting Account Name")} className="pod-live-conf-button">Submit</button>
            </div>
        </div>
    </div>)
                
            
        }else{
            return (
                <div className="App">
                </div>
            )
        }

    }
}