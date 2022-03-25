import { connect } from "react-redux";
import PostersList from "../../components/posters-list";
import { getPosters } from "../../redux/actions/posters";

const mapStateToProps = (store) => ({
  posters: store.posters.posters,
});

const mapActionToProps = {
  getPosters,
};

const PostersListContainer = connect(
  mapStateToProps,
  mapActionToProps
)(PostersList);
export default PostersListContainer;
