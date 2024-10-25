import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";

const ListingItem = ({ listing, id }) => {
  return (
    <li>
      <Link to={`/category/${listing.type}/${id}`}>
        <img src={listing.imgUrls[0]} alt="" />
        <Moment>{listing.timeStamp?.toDate()}</Moment>
      </Link>
    </li>
  );
};

ListingItem.propTypes = {
  listing: PropTypes.shape({
    type: PropTypes.string.isRequired,
    imgUrls: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  id: PropTypes.string.isRequired,
};

export default ListingItem;
