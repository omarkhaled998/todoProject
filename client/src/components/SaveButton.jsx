import React from 'react';
import Fab from '@material-ui/core/Fab';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';




export default function FloatingActionButtons(props) {


  return (
      <div className="buttonMargin">
        <Fab size="small"  aria-label="like">
            {props.clicked?<FavoriteIcon /> : <FavoriteBorderIcon/>}
        </Fab>
      </div>
  );
}
