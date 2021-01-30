import React, { useContext } from 'react';
import Styles from './Styles';
import GlobalContext from '../../context/GlobalContext';

export default function Logo() {
  const {
    SvgContainer,
    Background,
    Spoon,
    Text,
    Animated,
  } = Styles;

  const { styles: { logo: {
    width, colors, borderRadius, animation,
  } } } = useContext(GlobalContext);

  return (
    <SvgContainer
      width={ width }
      borderRadius={ borderRadius }
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 44.056 44.056"
    >
      <Background color={ colors.background } d="M0 0h44.056v44.056H0z" />
      <Animated animation={ animation }>
        <Spoon
          color={ colors.spoon }
          d={ `
        M22.028 1.879c-8.613 0-16.022 10.652-16.022 20.945 0 7.272 3.735 12.755 8.94
      15.48 1.237.73 2.554 1.36 3.843
      2.645.3.299.544.595.746.886v2.22h4.986v-2.22c.202-.292.446-.588.745-.886
      1.29-1.285 2.607-1.915 3.845-2.645 5.204-2.725 8.939-8.208
      8.939-15.48 0-10.293-7.174-20.945-16.022-20.945z
      ` }
        />
        <Text color={ colors.text } fontWeight="400" fontFamily="sans-serif">
          <text
            x="55.731"
            y="131.337"
            fontSize="37.501"
            strokeWidth=".938"
            transform="matrix(.94896 0 0 1 -46.067 -95.658)"
          >
            <tspan x="55.731" y="131.337" fontFamily="serif">C</tspan>
          </text>
          <text
            x="69.344"
            y="121.224"
            fontSize="10.583"
            strokeWidth=".265"
            transform="matrix(.94896 0 0 1 -46.067 -95.658)"
          >
            <tspan x="69.344" y="121.224" fontStyle="italic">etc</tspan>
          </text>
        </Text>
      </Animated>
    </SvgContainer>
  );
}
