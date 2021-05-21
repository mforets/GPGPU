var documenterSearchIndex = {"docs":
[{"location":"man/cipher/","page":"Affine cipher","title":"Affine cipher","text":"DocTestSetup  = quote\n    using GPGPU\nend\nCurrentModule = GPGPU","category":"page"},{"location":"man/cipher/#Affine-cipher","page":"Affine cipher","title":"Affine cipher","text":"","category":"section"},{"location":"man/cipher/","page":"Affine cipher","title":"Affine cipher","text":"An affine cipher is a special case of a monoalphabetic substitution cipher, in which where each letter in an alphabet is mapped to its numeric equivalent, encrypted with a simple mathematical function using modular artihmetic, of the form","category":"page"},{"location":"man/cipher/","page":"Affine cipher","title":"Affine cipher","text":"E(x) = (Ax + B) mod M","category":"page"},{"location":"man/cipher/","page":"Affine cipher","title":"Affine cipher","text":"and converted back to a letter. Here A and B are the encryption keys and M is the size of the alphabet. In this problem we consider an affine cipher with M = 256, and encryption keys A = 15 and B=27. Decryption is always possible provided that A and M are co-prime (i.e. they have only 1 as their common factor), and the decryption function is:","category":"page"},{"location":"man/cipher/","page":"Affine cipher","title":"Affine cipher","text":"D(x) = A^-1(x - B) mod M","category":"page"},{"location":"man/cipher/","page":"Affine cipher","title":"Affine cipher","text":"where A^-1 is the multiplicative inverse of A modulo M, i.e. satisfies the equation 1 = AA^-1 mod M.","category":"page"},{"location":"man/cipher/","page":"Affine cipher","title":"Affine cipher","text":"Since each letter can be encrypted and decrypted independently, we can use the GPU to decrypt a certain text in parallel.","category":"page"},{"location":"man/cipher/#Implementing-the-kernel","page":"Affine cipher","title":"Implementing the kernel","text":"","category":"section"},{"location":"man/cipher/#Multiple-block-approach","page":"Affine cipher","title":"Multiple-block approach","text":"","category":"section"},{"location":"man/cipher/","page":"Affine cipher","title":"Affine cipher","text":"In this part extend the algorithm to work with multiple blocks of threads such that it can process texts of arbitrary length.","category":"page"},{"location":"","page":"Home","title":"Home","text":"DocTestSetup = :(using GPGPU)","category":"page"},{"location":"#Context","page":"Home","title":"Context","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"This repo contains some notes and problem-solving tasks in Julia about General Purpose Programming for Graphics Processing Units (GPGPU).","category":"page"},{"location":"","page":"Home","title":"Home","text":"The assignments material are taken from the 2021 edition of the course GPGPU - Computación de Propósito General en Unidades de Procesamiento Gráfico, FING, UdelaR.","category":"page"}]
}