from typing import Tuple

import numpy as np
from numpy.typing import NDArray


def construct_func(
        coeff: list[float], *, x_domain: Tuple[float, float], dx: float=0.01
) -> NDArray:
    """
    """
    return np.asarray(
        [
            coeff[0] * n ** 3. +
            coeff[1] * n +
            coeff[2]
        ]
        for n in np.arange(x_domain[0], x_domain[1], dx)
    )