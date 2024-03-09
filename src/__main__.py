from pipeline import zk


def main() -> None:
    """
    """
    s = 1.
    poly_coeff = [1., 2., 3., 4., 5., 6.]
    g = 1.

    agg_commit, user_commits = zk.agg_commit(
        s, poly_coeff=poly_coeff, g=g
    )
    witnesses = zk.witnesses(
        s, poly_coeff=poly_coeff, g=g
    )

    verifications = [
        zk.verify(
            user_commit, agg_commit=agg_commit, witness=witness
        )
        for user_commit, witness in zip(user_commits, witnesses)
    ]


if __name__ == "__main__":
    main()