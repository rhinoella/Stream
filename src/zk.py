def commit(
        s: float, *, poly_coeff: list, g: float
) -> float:
    """
    """
    poly = 0.
    for idx, item in enumerate(poly_coeff):
        poly += item * s ** (len(poly_coeff) - idx - 1)
    return g ** poly


def witness(
        s: float, *, poly_coeff: list, g: float  
) -> list[float]:
    """
    """
    witness_array = []
    for idx in range(len(poly_coeff)):
        poly = 0.
        for idx_0, item in enumerate(poly_coeff):
            if idx != idx_0:
                poly += item * s ** (len(poly_coeff) - idx_0 - 1)
        witness_array.append(g ** poly)
    return witness_array