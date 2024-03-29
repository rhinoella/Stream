from typing import Tuple


def commit(
        s: float, *, poly_coeff: list, g: float
) -> Tuple[float, list[float]]:
    """
    Commits transaction data as a polynomial pool.
    """
    poly = 0.
    user_commits = []
    for idx, item in enumerate(poly_coeff):
        current_poly = item * s ** (len(poly_coeff) - idx - 1)
        poly += current_poly
        user_commits.append(g ** current_poly)
    return g ** poly, user_commits


def witnesses(
        s: float, *, poly_coeff: list, g: float  
) -> list[float]:
    """
    Produces witness parameters for individual data holders.
    """
    witness_array = []
    for idx in range(len(poly_coeff)):
        poly = 0.
        for idx_0, item in enumerate(poly_coeff):
            if idx != idx_0:
                poly += item * s ** (len(poly_coeff) - idx_0 - 1)
        witness_array.append(g ** poly)
    return witness_array


def verify(
        user_commit: float, witness: float, *, agg_commit: float
) -> bool:
    """
    Verifies ownership of data via zk.
    """
    return round(agg_commit / witness, 3) == round(user_commit, 3)