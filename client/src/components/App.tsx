import createLogger from "logging";
import { useEffect, useState } from "react";
import Group from "./Group";
import groupContainer from "./GroupContainer";
import config from "../config/default.json";
import axios from "axios";
import { IPost } from "../models";
import { DEFAULT_GROUP_BY, GROUP_BY_LABEL, GROUP_BY_OPTIONS, TITLE } from "../consts";
import { parseData } from "./utils";

const getPostsUrl = `${config.baseUrl}/posts`;
const logger = createLogger("app");

function App() {
  const GroupContainer = groupContainer(Group);

  const [ appState, setAppState ] = useState(
    {
      loading: false,
      posts: [] as IPost[],
      groupBy: DEFAULT_GROUP_BY
    }
  );

  useEffect(() => {
    if (appState.posts.length === 0) {
      setAppState({ loading: true, posts: [], groupBy: appState.groupBy});

      axios.get(getPostsUrl).then((result) => {
        if (result.data) {
          const posts: IPost[] = parseData(result.data);
          setAppState({loading: false, posts, groupBy: appState.groupBy});
        } else {
          logger.error(`Did not receive posts data, response returned status: ${result.status}`);
        }
      }).catch((error) => {
        logger.error(error);
      });
    }
    
  }, [setAppState, appState.groupBy, appState.posts.length]);

  function handleChange(ev: any) {
    setAppState({posts: appState.posts, loading: appState.loading, groupBy: ev.target.value});
  }

  return (
    <div className='App'>
      <div className='container'>
        <h1>{TITLE}</h1>
      </div>
      <label>{GROUP_BY_LABEL} 
        <select id="groupBy" onChange={handleChange}>
          <option value="week">{GROUP_BY_OPTIONS.week}</option>
          <option value="location">{GROUP_BY_OPTIONS.location}</option>
          <option value="author">{GROUP_BY_OPTIONS.author}</option>
      </select>
      </label>
      <div className='posts-container'>
        <GroupContainer isLoading={appState.loading} posts={appState.posts} groupBy={appState.groupBy}/>
      </div>
    </div>
  );
}

export default App;