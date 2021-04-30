```@meta
DocTestSetup  = quote
    using GPGPU
end
CurrentModule = GPGPU
```

# Affine cipher

An [affine cipher](https://en.wikipedia.org/wiki/Affine_cipher) is a special case
of a monoalphabetic substitution cipher, in which where each letter in an alphabet
is mapped to its numeric equivalent, encrypted with a simple mathematical function
using modular artihmetic, of the form

```math
E(x) = (Ax + B) \mod M,
```
and converted back to a letter. Here $A$ and $B$ are the *encryption keys* and $M$
is the size of the alphabet.
In this problem we consider an affine cipher with $M = 256$, and encryption keys
$A = 15$ and $B=27$.
Decryption is always possible provided that $A$ and $M$ are co-prime (i.e. they have only 1 as their common factor), and the decryption function is:

```math
D(x) = A^{-1}(x - B) \mod M,
```
where $A^{-1}$ is the multiplicative inverse of $A$ modulo $M$, i.e. satisfies the
equation $1 = AA^{-1} \mod M$.

Since each letter can be encrypted and decrypted independently, we can use the GPU
to decrypt a certain text in parallel.

## Implementing the kernel

## Multiple-block approach
