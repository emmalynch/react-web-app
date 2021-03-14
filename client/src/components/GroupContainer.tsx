import { LOADING_MESSAGE } from "../consts";
import { IPost } from "../models";
import Group from "./Group";

interface GroupContainerProps {
  isLoading: boolean
  posts: IPost[]
  groupBy: string
}
function GroupContainer(GroupComponent: typeof Group) {
    return function LoadingGroup(props: GroupContainerProps) {
      if (!props.isLoading) {
        const groupProps = {...props}
        return <GroupComponent {...groupProps} />;
      }
      return (
        <p style={{ textAlign: 'center', fontSize: '30px' }}>
          {LOADING_MESSAGE}
        </p>
      );
    };
  }
  
  export default GroupContainer;