ENV["GKSwstype"] = "100"
using Documenter, GPGPU

DocMeta.setdocmeta!(GPGPU, :DocTestSetup,
                   :(using GPGPU); recursive=true)

# generate Literate documentation
#include("generate.jl")

makedocs(
    format = Documenter.HTML(prettyurls = haskey(ENV, "GITHUB_ACTIONS"),
                             collapselevel = 1,
                             assets = ["assets/juliareach-light.css"]),
    sitename = "GPGPU",
    doctest = false,
    strict = false,
    pages = [
        "Home" => "index.md",
        "Assignments" => Any["Affine cipher" => "man/cipher.md"]]
)

deploydocs(
    repo = "github.com/mforets/GPGPU",
    push_preview = true,
)
