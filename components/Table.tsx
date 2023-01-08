import { Product } from '@stripe/firestore-stripe-payments';
/* check icon */
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
/* minus icon */
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

interface Props {
  plans: Product[];
  selectedPlan: Product,
}

const Table = ({ plans, selectedPlan }: Props) => {
  console.log(plans);
  return (
    <table>
      <tbody className='divide-y divide-[gray]'>
        {/* Subscribe price */}
        <tr className='tableRow'>
          <td className='tableDataTitle'>Передплата</td>
          {plans.map((plan) => (
            <td key={`${plan.id}-plan-${plan.id}`}
              className={`tableDataFeature 
              ${selectedPlan.id === plan.id
                  ? 'text-[var(--color-red)]'
                  : 'text-[gray]'}`}>
              {plan.prices[0].unit_amount! / 100} грн.
            </td>
          ))}
        </tr>

        {/* resilution */}
        <tr className='tableRow'>
          <td className='tableDataTitle'>Якість відео</td>
          {plans.map((plan) => (
            <td
              key={`${plan.id}-resolution-${plan.id}`}
              className={`tableDataFeature 
              ${selectedPlan.id === plan.id
                  ? 'text-[var(--color-red)]'
                  : 'text-[gray]'}`}
            >
              {plan.metadata.resolution}
            </td>
          ))}
        </tr>

        {/* video quality */}
        <tr className='tableRow'>
          <td className='tableDataTitle'>Якість відео</td>
          {plans.map((plan) => (
            <td
              key={`${plan.id}-videoQuality-${plan.id}`}
              className={`tableDataFeature 
              ${selectedPlan.id === plan.id
                  ? 'text-[var(--color-red)]'
                  : 'text-[gray]'}`}
            >
              {plan.metadata.videoQuality}
            </td>
          ))}
        </tr>

        {/* Total movies */}
        <tr className='tableRow'>
          <td className='tableDataTitle'>Кількість фільмів</td>
          {plans.map((plan) => (
            <td
              key={`${plan.id}-totalMovie-${plan.id}`}
              className={`tableDataFeature 
              ${selectedPlan.id === plan.id
                  ? 'text-[var(--color-red)]'
                  : 'text-[gray]'}`}
            >
              {plan.metadata.totalMovies}
            </td>
          ))}
        </tr>

        {/* tv series */}
        <tr className='tableRow'>
          <td className='tableDataTitle'>Серіали</td>
          {plans.map((plan) => (
            <td
              key={`${plan.id}-tvSeries-${plan.id}`}
              className={`tableDataFeature 
              ${selectedPlan.id === plan.id
                  ? 'text-[var(--color-red)]'
                  : 'text-[gray]'}`}
            >
              {plan.metadata.tvSeries ? (
                <CheckCircleOutlineIcon  />
              ) : (
                <RemoveCircleOutlineIcon />
              )}
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
};

export default Table;
