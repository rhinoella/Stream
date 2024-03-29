import math


def is_prime(n: int) -> bool:
    """
    Checks whether an input number is prime.
    """
    if n % 2 == 0 and n > 2:
        return False
    return all(
        n % i
        for i in range(3, int(math.sqrt(n)) + 1, 2)
    )