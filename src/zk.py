def commit(
        s: float, *, poly_coeff: list, g: float
) -> float:
    """
    """
    poly = 0.
    for idx, item in enumerate(poly_coeff):
        poly += item * s ** (len(poly_coeff) - idx - 1)
    return g ** poly
