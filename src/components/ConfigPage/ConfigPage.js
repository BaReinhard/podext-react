import React from 'react'
import Authentication from '../../util/Authentication/Authentication'

import './Config.css'

export default class ConfigPage extends React.Component{
    constructor(props){
        super(props)
        this.Authentication = new Authentication()

        //if the extension is running on twitch or dev rig, set the shorthand here. otherwise, set to null. 
        this.twitch = window.Twitch ? window.Twitch.ext : null
        this.state={
            finishedLoading:false,
            theme:'light'
        }
    }

    contextUpdate(context, delta){
        if(delta.includes('theme')){
            this.setState(()=>{
                return {theme:context.theme}
            })
        }
    }

    componentDidMount(){
        // do config page setup as needed here
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
            this.twitch.configuration.onChanged(()=>{
                // delete this.twitch.configuration.onChanged;
                // this.twitch.rig.log(JSON.stringify(this.twitch.configuration))
            })
    
            this.twitch.onContext((context,delta)=>{
                this.contextUpdate(context,delta)
            })
        }
    }
    handleClick(){
        this.twitch.configuration.set('broadcaster','1.0',{accountName:"test"})
        this.twitch.rig.log(`New Config message!\n${this.twitch.configuration.broadcaster}`)
        delete this.twitch.configuration.onChanged;
        let me = this;
        setTimeout(()=>{
            me.twitch.rig.log(JSON.stringify(me.twitch))

        },3000)

    }
    render(){
        if(this.state.finishedLoading && this.Authentication.isModerator()){
            return(
                <div className="config">
        <div className="config-text">
            <br/>Setup Instructions
			<br/>
			<br/>1. Go to <b>Extensions</b> page then <b>My Extensions</b> . Under PoD Gear click <i>Activate</i> and then <i>Set as Component X</i>
			<br/>
			<br/>2. Go to <b>Twitch Dashboard</b> and select <b>PoD Gear</b> from the dropdown list in the <b>Extension Panel</b>
			<br/>
			<br/>3. Type in your Account name and click submit. You may need to refresh your browser to see the extension on stream.
			<br/>
			<br/><i>Your latest character used will be shown automatically. Report feedback/bugs on the #website_portal channel of our discord.</i>
            <button id="submitChar" onClick={this.handleClick.bind(this)} className="pod-live-conf-button">Submit</button>
        </div>
    </div>
            )
        }
        else{
            return(
                <div className="Config">
                    <div className={this.state.theme==='light' ? 'Config-light' : 'Config-dark'}>
                        Loading...
                    </div>
                </div>
            )
        }
    }
}