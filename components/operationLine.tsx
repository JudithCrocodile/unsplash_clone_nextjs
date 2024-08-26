import Image from "next/image";
import OperationBtn from '../components/operationBtn'
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function perationLine( ) {
    const category = 0;
    const handleCategoryChange = ()=>{}

    return (
        <div className={""}>
                          <OperationBtn className={"item__favorite-btn"}>
                            <FavoriteIcon />
                          </OperationBtn>
      </div>
    )
  }