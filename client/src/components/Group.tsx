import { Grid } from "@material-ui/core";
import React from "react";
import { IPost } from "../models";
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PostDetailContainer from "./PostDetailContainer";
import { GROUPING_LABELS } from "../consts";
import { groupPostsByKey } from "./utils";

interface GroupProps {
    posts: IPost[];
    groupBy: string;
}

interface GroupState {
  posts: IPost[];
  groupBy: string;
  expanded: boolean;
}

class Group extends React.Component<GroupProps, GroupState> {
  constructor(props: GroupProps) {
    super(props);
    this.state = { posts: props.posts, groupBy: props.groupBy, expanded: true};

    this.onAuthorChange = this.onAuthorChange.bind(this);

  }

  onAuthorChange(ev: any, id: number) {
    const allPosts = this.state.posts;
    const postIndex = allPosts.findIndex((p) => p.id === id);
    allPosts[postIndex].author = ev
    this.setState({posts: allPosts, groupBy: this.state.groupBy});
  }

  renderPosts(posts: any[]) {
    return posts.map((post, idx) => {
      const postDetailContainerProps = {
        post: post,
        onAuthorChange: this.onAuthorChange
      }
      return <PostDetailContainer key={`post-detail-container-${idx}`} {...postDetailContainerProps}/>
    });
  }

  renderPostDetail() {

    const groupedVals = groupPostsByKey(this.state.posts, this.state.groupBy);
    
    const keys = Object.keys(groupedVals);

    return (keys.map((key: string, idx: number) => {
      return (
        <Accordion key={`post-group-${idx}`}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>{`${GROUPING_LABELS[this.state.groupBy]}${key}`} </Typography>
          </AccordionSummary>
          <AccordionDetails> 
            <Grid direction="column" container id="post-grid-body">
              {this.renderPosts(groupedVals[key] || [])}
            </Grid>
          </AccordionDetails>
        </Accordion>)
    }))
  }

  render() {
    return (
      <Grid direction="column" container id="post-grid-body">
        {this.renderPostDetail()}
      </Grid>
    );
  };
};



export default Group;