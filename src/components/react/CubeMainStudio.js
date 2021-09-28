import React from 'react';
import { cubeStudioService } from '../../services/cubeStudioService';

function CubeMainStudio(props) {
  const { set } = props;

  //
  // console.log('obj', obj.value);
  // React.useLayoutEffect(() => {
  //   return studio.onSelectionChange((newSelection) => {
  //     console.log('newSelection', newSelection);
  //     set(newSelection);
  //   });
  // });

  React.useLayoutEffect(() => {
    const unsubscribeFromChanges = cubeStudioService.subscribeToChangesAndReturnUnsubscriber(set);
    return unsubscribeFromChanges;
  }, [set]);

  return <></>;
}

export { CubeMainStudio };
