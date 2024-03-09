from pipeline import zk


def main() -> None:
    """
    """
    s = 1.
    poly_coeff = [1., 2., 3., 4., 5., 6.]
    g = 1.

    agg_commit = zk.agg_commit(
        s, poly_coeff=poly_coeff, g=g
    )
    witnesses = zk.witnesses(
        s, poly_coeff=poly_coeff, g=g
    )



    
    
    return


if __name__ == "__main__":
    main()