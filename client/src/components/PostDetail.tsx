import axios from "axios";
import createLogger from "logging";
import React from "react";
import { IPost } from "../models";

import config from "../config/default.json"
import { Grid, TextareaAutosize } from "@material-ui/core";
import { ID_LABEL, DATE_LABEL, LOCATION_LABEL, AUTHOR_LABEL, TEXT_LABEL } from "../consts";

const postsUrl = `${config.baseUrl}/posts`;
const logger = createLogger("post-detail");
interface PostDetailProps {
    post: IPost;
    onAuthorChange(ev: any, id: number): void;
}

class PostDetail extends React.Component<PostDetailProps, IPost> {

    constructor(props: PostDetailProps) {
        super(props);
        this.state = props.post;
    }

    handleAuthorChanges(ev: any) {
        this.setState({...this.state, author: ev.target.value});

    }
    handleTextChanges(ev: any) {
        this.setState({...this.state, text: ev.target.value});

    }

    handleSubmit(ev: any) {
        if (this.props.post.author !== this.state.author) {
            this.props.onAuthorChange(this.state.author, this.state.id);
        }
        axios.put(`${postsUrl}/${this.state.id}`, 
            {
                author: this.state.author,
                text: this.state.text
            })
            .then((response) => {
                logger.debug(response);
            })
            .catch((error) => {
                logger.error(error);
            })
        
        ev.preventDefault();
    }

    render(){
        const id = this.state.id.toString();
        const textAreaStyle = { width: '90%'}
       
        return (
            <Grid direction="column" container spacing={3} key={this.props.post.id} data-testid="PostDetailGrid">
            <Grid item data-testid="grid-id"><label>{ID_LABEL}{this.state.id}</label></Grid>
            <Grid item data-testid="grid-date"><label>{DATE_LABEL}{this.state.date.toString()}</label></Grid>
            <Grid item data-testid="grid-loc"><label>{LOCATION_LABEL}{this.state.location}</label></Grid>
            <Grid item  data-testid="grid-author"><label>{AUTHOR_LABEL}<input type="text" id={id} value={this.state.author} onChange={(ev) => this.handleAuthorChanges(ev)}></input></label></Grid>
            <Grid item xs={7}  data-testid="grid-text">
                <label>{TEXT_LABEL}<TextareaAutosize style={textAreaStyle} id={id} value={this.state.text} rowsMin={3} onChange={(ev) => this.handleTextChanges(ev)}></TextareaAutosize></label>
            </Grid>
            <Grid  item xs={1}><input type="submit" id={id} value="Save" onClick={(ev) => this.handleSubmit(ev)}></input></Grid>
        </Grid>)
    }
}

export default PostDetail;