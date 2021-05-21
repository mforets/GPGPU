```@meta
DocTestSetup  = quote
    using GPGPU
end
CurrentModule = GPGPU
```

# Affine cipher

In this problem we consider an [affine cipher](https://en.wikipedia.org/wiki/Affine_cipher), which
is a special case of a monoalphabetic substitution cipher, where each letter in an alphabet
is mapped to its numeric equivalent, encrypted with a simple mathematical function
using modular artihmetic.

## Problem definition

The encryption function has the form

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

## Serial implementation (CPU)

### Encryption function

The following C function is used to compute the module between two integers $a$ and $b$, guaranteeting that the result is always nonnegative.

```c
__device__ int modulo(int a, int b){
	int r = a % b;
	r = (r < 0) ? r + b : r;
	return r;
}
```

The implementation in Julia is:

```julia
function _mod(a, b)
    r = a % b
    r = (r < 0) ? r + b : r
    return r
end
```

### Decryption function

```julia
function decrypt(message::Vector{<:Integer}, Ainv, B, M)
    n = length(message)
    out = similar(message)
    
    for i in 1:n
        out[i] = decrypt(message[i], Ainv, B, M)
    end
    return out
end

function decrypt(x::Integer, Ainv, B, M)
    y = Ainv * (x - B)
    return _mod(y, M)
end
```

For instance,

message = [1, 2, 3]

```julia
julia> A = 15;

julia> Ainv = -17 # inverse of A modulo M

julia> B = 27

julia> M = 256;

julia> decrypt(message, A, B, M)
3-element Vector{Int64}:
 122
 137
 152
```

### Data

```julia
data = "secreto.txt"

function _open(path)
    file = open(path, "r")
    text = Vector{UInt8}()

    while !eof(file)
        i = read(file, UInt8)
        push!(text, i)
    end
    close(file)

    return text
end
```

### Benchmark

```julia
using StringEncodings, BenchmarkTools

text = _open(data)
@btime text = _open($data)

text_dec = decrypt(text, Ainv, B, M);
@btime decrypt($text, $Ainv, $B, $M);

result = decode(text_dec, "UTF-8")
@btime decode($text_dec, "UTF-8");

  84.849 ms (34 allocations: 2.00 MiB)
  8.027 ms (2 allocations: 825.70 KiB)
  8.538 ms (38083 allocations: 4.29 MiB)
```

### Result

```julia
Cien años de soledad 

EDITADO POR "EDICIONES LA CUEVA" 

println(result[1:1000])
```

## Multi-threaded implementation (CPU)

```julia
julia> Threads.nthreads()
 4
```
 
```
function decrypt_threaded(message::Vector{<:Integer}, Ainv, B, M)
    n = length(message)
    out = similar(message)
    
    Threads.@threads for i in 1:n
        out[i] = decrypt(message[i], Ainv, B, M)
    end
    return out
end

function decrypt(x::Integer, Ainv, B, M)
    y = Ainv * (x - B)
    return _mod(y, M)
end
```

## Using CuArrays (GPU)

## Writing the CUDA kernel

## Multiple-block approach

In this part extend the algorithm to work with multiple blocks of threads such that it can process texts of arbitrary length.
