import React from "react";
import { IPost } from "../models";
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PostDetail from "./PostDetail";

interface PostDetailContainerProps {
    post: IPost;
    onAuthorChange(ev: any, id: number): void;
}

class PostDetailContainer extends React.Component<PostDetailContainerProps, {}> {

    render() {
        const post = this.props.post;
        const postDetailProps = {
            post,
            onAuthorChange: this.props.onAuthorChange
        }
        return(
            <Accordion key={`post-detail-container-${post.id}`}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography> {post.author} - {post.date}</Typography>
            </AccordionSummary>
            <AccordionDetails> 
                <PostDetail key={`post-detail-${post.id}`} {...postDetailProps }/>
            </AccordionDetails>
        </Accordion>
        )
    }
}

export default PostDetailContainer;